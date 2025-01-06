import CardLayout from "./layout/CardLayout";
import Link from "next/link";
import { getPathId } from "@/utils/useQuery";

interface ListItemProps {
  itemList: Array<any>;
  pathName: string;
}

const ListItem = (props: ListItemProps) => {
  return (
    <ul className="list-none">
      {props.itemList.map((i) => {
        const id = getPathId(i.url);

        return (
          <CardLayout key={i.name}>
            <Link
              href={{
                pathname: `${props.pathName}/${id}`,
              }}
            >
              {i.name}
            </Link>
          </CardLayout>
        );
      })}
    </ul>
  );
};

export default ListItem;
