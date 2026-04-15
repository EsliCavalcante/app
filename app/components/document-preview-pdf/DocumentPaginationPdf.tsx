import { Fragment } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

type DocumentPaginationProps = {
	numPages: number;
	pageNumber: number;
	onNext: (value: number) => void;
	onPrevious: (value: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number) {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const pages = new Set<number>([1, totalPages, currentPage]);

	if (currentPage - 1 > 1) pages.add(currentPage - 1);
	if (currentPage + 1 < totalPages) pages.add(currentPage + 1);

	return [...pages].sort((a, b) => a - b);
}

export default function DocumentPagination({
	numPages,
	pageNumber,
	onPrevious,
	onNext,
}: DocumentPaginationProps) {
	if (!numPages) return null;

	const handlePrevious = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();

		if (pageNumber > 1) onPrevious(pageNumber - 1);
	};

	const handleNext = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		if (pageNumber < numPages) onNext(pageNumber + 1);
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={handlePrevious}
						className={
							pageNumber <= 1
								? "pointer-events-none opacity-50"
								: undefined
						}
					/>
				</PaginationItem>
				{getVisiblePages(pageNumber, numPages).map(
					(page, index, pages) => {
						const previousPage = pages[index - 1];
						const shouldShowEllipsis =
							previousPage && page - previousPage > 1;

						return (
							<Fragment key={page}>
								{shouldShowEllipsis ? (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								) : null}
								<PaginationItem>
									<PaginationLink
										href="#"
										isActive={pageNumber === page}
										onClick={(event) => {
											event.preventDefault();
											onNext(page);
										}}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							</Fragment>
						);
					},
				)}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={handleNext}
						className={
							pageNumber >= numPages
								? "pointer-events-none opacity-50"
								: undefined
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
