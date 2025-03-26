import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDownIcon } from "lucide-react";
import ProductFilter from "../../components/shopping-view/filter";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "../../config";
import {
  getAllFilteredProducts,
  getProductDetails,
} from "../../store/shop/product-slice";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";

// Helper function to create URL search parameters
function createSearchParamsHelper(filterParams) {
  return Object.entries(filterParams)
    .filter(([_, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.join(","))}`)
    .join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { products, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sorting handler
  const handleSort = (value) => setSort(value);

  // Filtering handler
  function handleFilter(sectionId, option) {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = [option];
      } else {
        const index = updatedFilters[sectionId].indexOf(option);
        index === -1
          ? updatedFilters[sectionId].push(option)
          : updatedFilters[sectionId].splice(index, 1);
      }
      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  }

  // Product details handler
  const handleProductDetail = (productId) =>
    dispatch(getProductDetails(productId));

  // Add to cart handler
  const handleAddToCart = (productId) => {
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast("Item added to cart successfully");
        }
      }
    );
  };

  // Effect to open details dialog when product details are loaded
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Effect to update URL search parameters when filters change
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      setSearchParams(new URLSearchParams(createSearchParamsHelper(filters)));
    }
  }, [filters, setSearchParams]);

  // Effect to initialize filters and sorting from session storage
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // Fetch products on filters/sort change
  useEffect(() => {
    if (filters && sort) {
      dispatch(
        getAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

  if (!products?.data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className="flex items-center gap-5">
            <span className="text-muted-foreground">
              {products.data.length} Products
            </span>
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
                  {sortOptions.map(({ id, label }) => (
                    <DropdownMenuRadioItem key={id} value={id}>
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {products.data.map((item) => (
            <ShoppingProductTile
              key={item._id}
              product={item}
              handleProductDetail={handleProductDetail}
              handleAddToCart={handleAddToCart}
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
