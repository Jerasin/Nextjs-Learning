import { CardLayoutV2, CardLayout } from "./layout";
import Link from "next/link";
import { getPathId } from "../utils/useQuery";

interface ListItemProps {
  itemList: Array<any>;
  pathName: string;
}

const ListItem = (props: ListItemProps) => {
  return (
    <ul className="list-none w-48 text-center">
      {props.itemList.map((i) => {
        const id = getPathId(i.url);

        return (
          <CardLayoutV2 key={i.name}>
            <Link
              className="block w-full h-full justify-center flex flex-col items-center"
              href={{
                pathname: `${props.pathName}/${id}`,
              }}
            >
              {i.name}
            </Link>
          </CardLayoutV2>
        );
      })}
    </ul>
  );
};

export default ListItem;
