import { useState } from "react";
import { Button } from "./components/Button";
import Dialog from "./components/Dialog";
import Form from "./components/Form";
import Table from "./components/Table";
import { type ListItem } from "./types/ListItem";
import { pickAPair } from "./utils";
import Toaster from "./components/Toaster";

const initialList: ListItem[] = [
  {
    id: 1,
    position: 1,
    name: "David",
    score: 0,
  },
  {
    id: 2,
    position: 2,
    name: "Amela",
    score: 0,
  },
  {
    id: 3,
    position: 3,
    name: "Hasan",
    score: 0,
  },
  {
    id: 4,
    position: 4,
    name: "Ibrahim",
    score: 0,
  },
  {
    id: 5,
    position: 5,
    name: "Senad",
    score: 0,
  },
  {
    id: 6,
    position: 6,
    name: "Lamija",
    score: 0,
  },
];

const firstItem = initialList[0];
const secondItem = initialList[1];

function App() {
  const [list, setList] = useState(initialList);
  const [item1, setItem1] = useState<ListItem | null>(firstItem);
  const [item2, setItem2] = useState<ListItem | null>(secondItem);
  const [pairedItems, setPairedItems] = useState<ListItem[][]>([
    [firstItem, secondItem],
  ]);
  const [showToaster, setShowToaster] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [winnerName, setWinnerName] = useState("");

  const onCloseDialog = () => {
    setIsFormDialogOpen(false);
  };

  const onSubmitForm = (biggerValueItem: ListItem) => {
    setShowToaster(true);
    setWinnerName(biggerValueItem.name);
    const pair = pickAPair(list, pairedItems);
    setIsFormDialogOpen(false);

    setList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.name === biggerValueItem.name
          ? { ...item, score: item.score + 1 }
          : item
      );

      updatedList.sort((a, b) => b.score - a.score);
      updatedList.forEach((item, index) => (item.position = index + 1));
      return updatedList;
    });

    if (!pair) {
      setItem1(null);
      setItem2(null);
      return;
    }

    setPairedItems((prevItems) => {
      const pairNames = [pair[0], pair[1]];
      return [...prevItems, pairNames];
    });

    setItem1(pair[0]);
    setItem2(pair[1]);
  };

  const handleButtonClick = () => {
    setShowToaster(false);
    setIsFormDialogOpen(true);
  };

  const onRestart = () => {
    const updatedList = initialList.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setList(updatedList);
    setItem1(firstItem);
    setItem2(secondItem);
    setPairedItems([[firstItem, secondItem]]);
  };

  return (
    <div className="container h-full px-6 pt-12 pb-6 mx-auto max-w-7xl">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-hidden">
              <Table data={list} />
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleButtonClick}
        className="mt-2"
        disabled={!(item1 && item2)}
      >
        {item1 && item2
          ? `Compare ${item1.name} and ${item2.name}`
          : "Completed"}
      </Button>
      <br />
      {!item1 && !item2 && (
        <Button onClick={onRestart} className="mt-4">
          Restart
        </Button>
      )}
      <Dialog open={isFormDialogOpen} onClose={onCloseDialog}>
        {item1 && item2 && (
          <Form item1={item1} item2={item2} onSubmit={onSubmitForm} />
        )}
      </Dialog>
      {showToaster && <Toaster message={`+1 score added to ${winnerName}`} />}
    </div>
  );
}

export default App;
