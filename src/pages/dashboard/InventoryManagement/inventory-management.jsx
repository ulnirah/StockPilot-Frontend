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
  import TransactionsTable from "@/components/tables/tables";
  import React, { useState } from "react";
import DeliveryTable from "./components/DeliveryTable";
import TransactionTable from "./components/TransactionTable";
import SupplyTable from "./components/SupplyTable";
  
  export function InventoryManagement() {
  
    const [activeTab, setActiveTab] = useState("transaction");
  
    return (
      <div>
        <div className="mt-12 flex justify-center " >
          <Tabs value={activeTab} className="max-w-[40rem]">
            <TabsHeader >
              <Tab value="transaction" onClick={() => setActiveTab("transaction")}>
                <div className="flex items-center mr-2 gap-2">
                  <InboxStackIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                  Transaction
                </div>
              </Tab>
              <Tab value="delivery" onClick={() => setActiveTab("delivery")}>
                <div className="flex items-center mr-2 gap-2">
                  <Square3Stack3DIcon className="-mt-1 mr-2 ml-2inline-block h-5 w-5" />
                  Delivery
                </div>
              </Tab>
              <Tab value="supply" onClick={() => setActiveTab("supply")}>
                <div className="flex items-center mr-2 gap-2">
                  <CubeIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                  Supply
                </div>
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>

  
        <div className="mt-6 flex justify-center">
          { activeTab==="transaction" && <TransactionTable/>}
          { activeTab==="delivery" && <DeliveryTable/>}
          { activeTab==="supply" && <SupplyTable/>}
        </div>
        
  
      </div>
    );
  }
  
  export default InventoryManagement;
  