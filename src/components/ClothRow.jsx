import "./ClothRow.css";
import { MdDelete } from "react-icons/md";

const ClothRow = (item) => {
  const {
    clothName,
    clothId,
    price,
    quantity,
    color,
    description,
    date,
    size,
  } = item.item;
  console.log(item.item);

  return (
    <tr>
      <td>{clothName}</td>
      <td>{clothId}</td>
      <td>{price} Taka</td>
      <td>
        {quantity} {quantity >= 1 ? "Pices" : "Pice"}
      </td>
      <td>{color}</td>
      <td>{description}</td>
      <td>{date}</td>
      <td>{size}</td>
      <td>
        <span onClick={() => item.edite(clothId)}>
          <MdDelete />
        </span>
      </td>
    </tr>
  );
};

export default ClothRow;
