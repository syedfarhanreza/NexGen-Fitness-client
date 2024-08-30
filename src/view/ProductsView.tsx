import ProductCard from "@/components/product/ProductCard";
import ProductNotFound from "@/components/product/ProductsNotFound";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListOrderedIcon from "@/icons/ListOrderedIcon";
import { categories } from "@/mock/categories";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { IProduct } from "@/types";
import { capitalized } from "@/utils/capitalizedWord";
import Loader from "@/utils/Loader";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductsView = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  // filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceInputState, setPriceInputState] = useState<[number, number]>([
    0, 0,
  ]);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetAllProductQuery({
    min: priceRange[0],
    max: priceRange[1],
    page: currentPage,
    searchTerm,
    sort,
    category: selectedCategories,
  });

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setPriceInputState([0, 0]);
    setSort("");
  };

  const handleChangePriceState = (value: string, index: 0 | 1) => {
    const number = parseInt(value);
    const replica: [number, number] = [...priceInputState];
    replica[index] = number;
    setPriceInputState(replica);
  };

  // => debouncing
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <Loader className="!h-[100vh]" />;
  }
  if (isError) {
    return <div>Something went wrong while fetching product</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 min-h-[100vh]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">Search</h3>
            <Input
              type="text"
              placeholder="Search products..."
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Categories</h3>
            <div className="space-y-2">
              {category ? (
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <span className="ml-2">{capitalized(category)}</span>
                </div>
              ) : (
                ""
              )}
              {categories.slice(0, 4).map(({ label, value }, i) => (
                <div className="flex items-center" key={i + "category"}>
                  <Checkbox
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={() => handleCategoryChange(value)}
                  />
                  <span className="ml-2">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Price Range</h3>
            <div />
            <div className="w-full flex-col gap-[10px]">
              <div className="mt-2 center gap-[5px]">
                <Input
                  placeholder="Min"
                  type="number"
                  min={0}
                  value={priceInputState[0] || ""}
                  onChange={(e) => handleChangePriceState(e.target.value, 0)}
                />
                <Input
                  placeholder="Max"
                  value={priceInputState[1] || ""}
                  min={0}
                  type="number"
                  onChange={(e) => handleChangePriceState(e.target.value, 1)}
                />
              </div>
              <Button
                className="w-full bg-primaryMat text-white mt-[10px]"
                onClick={() => setPriceRange(priceInputState)}
              >
                Add
              </Button>
            </div>
          </div>

          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
              <Select onValueChange={(e) => setSort(e)} value={sort}>
                <SelectTrigger>
                  <ListOrderedIcon className="h-4 w-4" />
                  <SelectValue placeholder="Sort prodct" />
                </SelectTrigger>
                <SelectGroup className="w-[100px]">
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
            </div>
          </div>
          {data?.data?.length && data?.data?.length > 0 ? (
            <div className="griProductResponsive w-full gap-[15px]">
              <>
                {data?.data?.map((data, i) => (
                  <ProductCard product={data as IProduct} key={i + "prodcut"} />
                ))}
              </>
            </div>
          ) : (
            <ProductNotFound />
          )}
        </div>
      </div>
      <Pagination className="mt-[20px]">
        <PaginationContent>
          {Array.from({ length: Math.ceil((data?.totalDoc || 0) / 10) }).map(
            (_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? "bg-primaryMat text-white hover:bg-primaryMat hover:text-white"
                      : "text-primaryMat"
                  } border-[1px] border-primaryMat`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default ProductsView;
