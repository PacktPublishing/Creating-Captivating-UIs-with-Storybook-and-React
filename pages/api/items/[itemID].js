import { itemsRepo } from "../../../items-repo";

export default async (req, res) => {
    const { method, body, query } = req;

    // Pulls reference to itemID from query
    const itemID = String(query.itemID);
    const item = itemsRepo.getById(itemID);

    console.log(itemID);

    try {
        switch (method) {
            case "GET":
                res.status(200).json({ ...item });
                break;

            case "PUT":
                const updatedItem = {
                    ...item,
                    label: body.label,
                    done: body.done,
                };
                itemsRepo.update(itemID, updatedItem);
                res.status(200).json({
                    ...updatedItem,
                });
                break;

            case "DELETE":
                const deletedItem = {
                    ...item,
                };
                itemsRepo.delete(itemID);
                res.status(200).json({
                    deleted: true,
                });
                break;

            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).end(`Something went wrong`);
    }
};
