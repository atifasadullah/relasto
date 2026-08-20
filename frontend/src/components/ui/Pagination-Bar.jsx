import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";

export function PaginationBar({
    currentPage = 1,
    pageSize = 10,
    totalCount = 0,
    isLoading = false,
}) {
    const navigate = useNavigate({ from: "/properties" });
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage)
            return;
        navigate({
            search: (old) => ({ ...old, page: newPage }),
        });
    };

    const handlePageSizeChange = (newSize) => {
        navigate({
            search: (old) => ({ ...old, page: 1, limit: Number(newSize) }),
        });
    };

    const getVisiblePageNumbers = () => {
        const pages = [];
        const maxVisible = 3;
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Pagination>
            <PaginationContent className="w-full justify-between flex-wrap gap-4">
                {!isLoading && (
                    <PaginationItem>
                        <span className="text-muted-foreground text-sm">
                            Page{" "}
                            <span className="text-foreground font-medium">
                                {currentPage}
                            </span>{" "}
                            of{" "}
                            <span className="text-foreground font-medium">
                                {totalPages}
                            </span>
                        </span>
                    </PaginationItem>
                )}

                <PaginationItem className="flex items-center gap-1">
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                            currentPage === 1 || isLoading
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />

                    {getVisiblePageNumbers().map((pageNum) => (
                        <PaginationLink
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            isActive={pageNum === currentPage}
                            className="cursor-pointer"
                        >
                            {pageNum}
                        </PaginationLink>
                    ))}

                    {totalPages > 3 && currentPage < totalPages - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                            currentPage >= totalPages || isLoading
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                <PaginationItem>
                    <Select
                        value={String(pageSize)}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder={`${pageSize} / page`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 / page</SelectItem>
                            <SelectItem value="15">15 / page</SelectItem>
                            <SelectItem value="20">20 / page</SelectItem>
                            <SelectItem value="25">25 / page</SelectItem>
                        </SelectContent>
                    </Select>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
