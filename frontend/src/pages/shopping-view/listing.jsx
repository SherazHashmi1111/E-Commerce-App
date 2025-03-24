import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilteredProducts } from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import { getProductDetails } from "../../store/shop/product-slice/index";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

// Function to convert filter parameters into a query string for URL
function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  // Fetching product data and loading state from Redux store
  const { products, loading, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  // State for managing applied filters and sorting option
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Managing search parameters for URL state
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to handle sorting change
  function handleSort(value) {
    setSort(value);
  }

  // Function to handle filtering logic
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    // If filter category doesn't exist, create a new one
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      // Toggle selection of a filter option
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    // Store filters in sessionStorage to maintain state across refreshes
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  // Product details handling
  const handleProductDetail = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
  };

  // Effect to update URL search parameters when filters change
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  // Effect to update URL search parameters when filters change
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // Effect to initialize sorting and filters from session storage on component mount
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // Fetch products when the component mounts or dispatch changes
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        getAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, filters, sort]);

  // Prevent rendering if product data is not available
  if (products.data === undefined) return;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      {/* Product filter sidebar */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        {/* Header section with title and sorting dropdown */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className="flex items-center gap-5">
            <span className="text-muted-foreground">
              {products.data.length} Products
            </span>

            {/* Dropdown for sorting options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Grid layout for displaying product tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {products.data.map((item) => (
            <ShoppingProductTile
              product={item}
              key={item._id}
              handleProductDetail={handleProductDetail}
            />
          ))}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}

export default ShoppingListing;
