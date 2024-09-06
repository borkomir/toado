import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/task", async (_, res) => {
  const tasks = await prisma.task.findMany();
  res.json({ tasks });
});

router.put("/task", async (req, res) => {
  if (!Object.keys(req.body).includes("task")) res.sendStatus(400);
  await prisma.task.create({
    data: {
      name: req.body.task,
      completed: false, // TODO: set false as default in schema
    },
  });
  res.sendStatus(201);
}); // TODO: add new task

router.patch("/task/:id(d+)", () => {
  console.log("PATCH /task");
}); // TODO: mark as done / undone

router.delete("/task/:id(d+)", () => {
  console.log("DELETE /task");
}); // TODO: delete a task

export default router;
