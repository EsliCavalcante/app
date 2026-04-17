import { Waypoints } from "lucide-react";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

const selectFilter = (selects: Array<string>, selectsFilter: Array<string>) => {
	return selects.filter((pre) => {
		return !selectsFilter
			.map((value) => value.toLowerCase())
			.includes(pre.toLocaleLowerCase());
	});
};

export default function SelectColumnsHeader(props: {
	disabled?: boolean;
	values: Array<string>;
	onValueContainerChange?: (container: string) => void;
	onValueTempChange?: (temp: string) => void;
	onValuePositionChange?: (position: string) => void;
}) {
	const [selectContainer, setSelectContainer] = useState("");
	const [selectTemp, setselectTemp] = useState("");
	const [selectPosition, setSelectPosition] = useState("");

	const handleValueTempChange = (sheet: string) => {
		if (sheet === "none") {
			if (props.onValueTempChange) props.onValueTempChange(sheet);
			setselectTemp("");
			setSelectContainer("");
			setSelectPosition("");
			return;
		}
		if (props.onValueTempChange) props.onValueTempChange(sheet);
		setselectTemp(sheet);
	};
	const handleValueContainerChange = (container: string) => {
		if (container === "none") {
			if (props.onValueContainerChange)
				props.onValueContainerChange(container);
			setSelectContainer("");
			setSelectPosition("");
			return;
		}
		if (props.onValueContainerChange)
			props.onValueContainerChange(container);
		setSelectContainer(container);
	};
	const handleValuePositionChange = (position: string) => {
		if (position === "none") {
			if (props.onValuePositionChange)
				props.onValuePositionChange(position);
			setSelectPosition("");
			return;
		}
		if (props.onValuePositionChange) props.onValuePositionChange(position);
		setSelectPosition(position);
	};

	const isSelectTemp = selectTemp === "" ? true : false;
	const isSelectContainer = selectContainer === "" ? true : false;

	const values = [...props.values, "none"];

	return (
		<div className="rounded-3xl border bg-muted/10 p-6 shadow-lg md:col-span-8">
			<h3 className="mb-6 flex items-center gap-2 text-sm font-bold ">
				<Waypoints className="size-4 " />
				Mapeamento de colunas
			</h3>
			<div>
				<div className="space-y-2">
					<label className="text-xs font-semibold uppercase tracking-wider text-slate-500"></label>
					<div className="space-y-8">
						<Select
							disabled={props.disabled}
							value={selectContainer}
							onValueChange={handleValueContainerChange}
						>
							<SelectTrigger className="h-12 w-full py-5 lowercase">
								<SelectValue
									placeholder={"Selecione coluna container"}
								/>
							</SelectTrigger>
							<SelectContent>
								{selectFilter(values, [
									selectTemp,
									selectPosition,
								]).map((item, index) => (
									<SelectItem
										key={item + index + 1}
										className="py-3 lowercase"
										value={item}
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* container*/}

						<Select
							disabled={isSelectContainer}
							value={selectTemp}
							onValueChange={handleValueTempChange}
						>
							<SelectTrigger className="h-12 w-full py-5 lowercase">
								<SelectValue
									placeholder={"Selecione coluna container"}
								/>
							</SelectTrigger>
							<SelectContent>
								{selectFilter(values, [
									selectContainer,
									selectPosition,
								]).map((item, index) => (
									<SelectItem
										key={item + index}
										className="py-3 lowercase"
										value={item}
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* position */}
						<Select
							disabled={isSelectTemp}
							value={selectPosition}
							onValueChange={handleValuePositionChange}
						>
							<SelectTrigger className="h-12 w-full py-5 lowercase">
								<SelectValue
									placeholder={"Selecione coluna posição "}
								/>
							</SelectTrigger>
							<SelectContent>
								{selectFilter(values, [
									selectContainer,
									selectTemp,
								]).map((item, index) => (
									<SelectItem
										key={item + index + 2}
										className="py-3 lowercase"
										value={item}
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
}
