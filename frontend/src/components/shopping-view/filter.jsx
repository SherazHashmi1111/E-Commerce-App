import React, { Fragment } from "react";
import { filterOptions } from "../../config";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      {/* Filter Section Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Filter Options List */}
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((category) => (
          <Fragment key={category}>
            {" "}
            {/* Loop through filter categories */}
            <div>
              {/* Category Title */}
              <h3 className="text-base font-extrabold">{category}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[category].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    {" "}
                    {/* Render each filter option */}
                    <Checkbox
                      checked={filters[category]?.includes(option.id) || false} // Determine if the option is selected
                      onCheckedChange={() => handleFilter(category, option.id)} // Handle checkbox toggle
                    />
                    {option.label} {/* Display filter label */}
                  </label>
                ))}
              </div>
            </div>
            {/* Visual Separator Between Categories */}
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
