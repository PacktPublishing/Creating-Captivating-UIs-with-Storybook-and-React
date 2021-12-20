import { itemsRepo } from "../../../items-repo";

export default async (req, res) => {
    const { method, body } = req;

    console.log(body);

    try {
        switch (method) {
            // GET /items
            case "GET":
                const items = itemsRepo.getAll();
                res.status(200).json(items);
                break;

            // POST /items
            case "POST":
                console.log("Create Item");
                const newItem = {
                    label: body.label,
                    done: body.done,
                };
                console.log(newItem);
                const createdItem = itemsRepo.create(newItem);
                res.status(201).json({
                    ...createdItem,
                });

                break;
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                res.status(405).end("Method ${method} Not Allowed");
        }
    } catch (e) {
        console.error(e);
        res.status(500).end("Something went wrong");
    }
};
