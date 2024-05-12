import React from "react";
import styles from "../../../ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import { fetchSingleProduct } from "../../../lib/data";
import ReadOnlyInput from "../../../ui/dashboard/readOnlyInput";
import { updateProduct } from "../../../lib/actions";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchSingleProduct(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={product.img || "/noproduct.jpg"}
            alt=""
            fill
          />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form
          action={updateProduct}
          className={styles.form}
        >
          <ReadOnlyInput value={product._id.toString()} />

          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder={product.title}
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder={`$ ${product.price}`}
          />
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            placeholder={product.stock}
          />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={product.color}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={product.size}
          />
          <label>Category</label>
          <select
            name="category"
            id="category"
          >
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            rows="10"
            placeholder={product.desc}
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
