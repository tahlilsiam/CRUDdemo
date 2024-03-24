import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics");

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();
  if (!topics || topics.length === 0) {
    return (
      <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        No data is here to show
      </div>
    );
  }
  console.log(topics);

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
