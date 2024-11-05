import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  InboxStackIcon,
  CubeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import CategoryTable from "./components/CategoryTable";
import RetailerTable from "./components/RetailerTable";
import SupplierTable from "./components/SupplierTable";

export function DataManagement() {

  const [activeTab, setActiveTab] = useState("product");

  return (
    <div>
      <div className="mt-12 flex justify-center " >
        <Tabs value={activeTab} className="max-w-[40rem] ">
          <TabsHeader className="" >
            <Tab value="product" onClick={() => setActiveTab("product")}  className={activeTab === "product" ? " text-blue" : ""}>
              <div className="flex items-center mr-2 gap-2">
                <InboxStackIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Product
              </div>
            </Tab>
            <Tab value="category" onClick={() => setActiveTab("category")} className={activeTab === "category" ? " text-blue" : ""}>
              <div className="flex items-center mr-2 gap-2">
                <Square3Stack3DIcon className="-mt-1 mr-2 ml-2inline-block h-5 w-5" />
                Category
              </div>
            </Tab>
            <Tab value="supplier" onClick={() => setActiveTab("supplier")}  className={activeTab === "supplier" ? " text-blue" : ""}>
              <div className="flex items-center mr-2 gap-2">
                <CubeIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Supplier
              </div>
            </Tab>
            <Tab value="retailer" onClick={() => setActiveTab("retailer")}  className={activeTab === "retailer" ? " text-blue" : ""}>
              <div className="flex items-center mr-2 gap-2">
                <ShoppingBagIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Retailer
              </div>
            </Tab>
          </TabsHeader>

        </Tabs>
      </div>

      <div className="mt-6 flex justify-center">
        { activeTab==="product" && <ProductTable/>}
        { activeTab==="category" && <CategoryTable/>}
        { activeTab==="supplier" && <SupplierTable/>}
        { activeTab==="retailer" && <RetailerTable/>}
      </div>

      

    </div>
  );
}

export default DataManagement;
