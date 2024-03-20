import EditTopicForm from "@/components/EditTopicForm";
import React from "react";

const getTopicsById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch this data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditTopic = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicsById(id);
  const { title, description } = topic;
  return <EditTopicForm id={id} title={title} description={description} />;
};

export default EditTopic;
