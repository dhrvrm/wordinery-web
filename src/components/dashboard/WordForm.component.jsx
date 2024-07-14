import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useDebounce from "../../lib/hooks/useDebounce";
import Shimmer from "../Shimmer";
import { Badge } from "../ui/badge";

const WordForm = () => {
	const [word, setWord] = useState("");
	const [definition, setDefinition] = useState(null);
	const [suggestions, setSuggestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const debouncedWord = useDebounce(word, 500);

	useEffect(() => {
		if (debouncedWord.length >= 3) {
			fetchSuggestions(debouncedWord);
		} else {
			setSuggestions([]);
		}
	}, [debouncedWord]);

	const fetchDefinition = async (word) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			);
			const data = await response.json();
			setDefinition(
				data[0]?.meanings[0]?.definitions[0]?.definition ||
					"Definition not found."
			);
		} catch (error) {
			console.error("Error fetching definition:", error);
			setDefinition("Definition not found.");
		} finally {
			setIsLoading(false);
		}
	};

	const fetchSuggestions = async (input) => {
		try {
			const response = await fetch(`https://api.datamuse.com/sug?s=${input}`);
			const data = await response.json();
			setSuggestions(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const handleInputChange = (event) => {
		const newWord = event.target.value;
		setWord(newWord);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchDefinition(word);
	};

	const handleSuggestionClick = (suggestion) => {
		setWord(suggestion);
		setSuggestions([]);
		setWord("");
		fetchDefinition(suggestion);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='border-2 p-2 flex flex-col border-black w-80'
		>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Search Word</Label>
					<Input
						id='name'
						placeholder='Type your word'
						value={word}
						onChange={handleInputChange}
					/>
					<div className='flex gap-x-4 gap-y-1 flex-wrap justify-start'>
						{suggestions.length > 0 &&
							suggestions.map((suggestion) => (
								<Badge
									variant='outline'
									key={suggestion.word}
									className='cursor-pointer hover:bg-slate-300'
									onClick={() => handleSuggestionClick(suggestion.word)}
								>
									{suggestion.word}
								</Badge>
							))}
					</div>
				</div>
				{isLoading ? (
					<Shimmer />
				) : (
					definition && (
						<div className='flex flex-col space-y-1.5'>
							<Label>Definition</Label>
							<p>{definition}</p>
						</div>
					)
				)}
			</div>
		</form>
	);
};

export default WordForm;
