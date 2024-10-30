import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  Square3Stack3DIcon,
  InboxStackIcon,
  CubeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";

export function DataManagement() {
  return (
    <div>
      <div className="mt-12 flex justify-center " >
        <Tabs value="app" className="max-w-[40rem]">
          <TabsHeader >
            <Tab value="app">
              <div className="flex items-center mr-2 gap-2">
                <InboxStackIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Product
              </div>
            </Tab>
            <Tab value="message">
              <div className="flex items-center mr-2 gap-2">
                <Square3Stack3DIcon className="-mt-1 mr-2 ml-2inline-block h-5 w-5" />
                Category
              </div>
            </Tab>
            <Tab value="settings">
              <div className="flex items-center mr-2 gap-2">
                <CubeIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Supplier
              </div>
            </Tab>
            <Tab value="testing">
              <div className="flex items-center mr-2 gap-2">
                <ShoppingBagIcon className="-mt-1 mr-2 ml-2 inline-block h-5 w-5" />
                Retailer
              </div>
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>

      <div className="mt-12 mb-8 flex flex-col  gap-12">
        <Card>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["author", "function", "status", "employed", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {authorsTableData.map(
                  ({ img, name, email, job, online, date }, key) => {
                    const className = `py-3 px-5 ${
                      key === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" variant="rounded" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {job[0]}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {job[1]}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={online ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {date}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            Edit
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default DataManagement;
