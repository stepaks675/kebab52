import { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { Product } from "../menu/Product";

export const AddForm = () => {
  const [formState, setFormState] = useState({
    category: "",
    img: null,
    price: 0,
    name: "",
    weight: 100,
    preview: "/no-photo.jpg",
  });
  const [categories, setCategories] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("/api/menu/categories");
        if (res.status != 404) {
          const cat = await res.json();
          setCategories(cat);
        } else {
          throw "error";
        }
      } catch (err) {
        alert(`Ошибка при получении категорий: ${err}`);
      }
    }
    getCategories();
  }, [update]);

  function validateAndAppend(form, key, formVal) {
    if (!formVal) throw new Error(`Поле ${key} не должно быть пустым`);
    form.append(key, formVal);
    return true;
  }

  function handleCategory(e) {
    setFormState((prev) => {
      return {
        ...prev,
        category: e.target.value,
      };
    });
  }
  function handleChange(event) {
    event.preventDefault();
    const { id, value, files } = event.target;
    setFormState((prev) => ({
      ...prev,
      [id]: id === "img" ? files[0] : value,
    }));

    setFormState((prev) => {
      return {
        ...prev,
        preview: prev.img ? URL.createObjectURL(prev.img) : prev.preview,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.encType = "multipart/form-data";

    try {
      validateAndAppend(data, "category", formState.category);
      validateAndAppend(data, "name", formState.name);
      validateAndAppend(data, "price", formState.price);
      validateAndAppend(data, "img", formState.img);
      validateAndAppend(data, "weight", formState.weight);
      data.append("option", "ADD");
    } catch (err) {
      alert(err);
      return;
    }
    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        body: data,
      });
      const rdata = await res.json();
      alert("Добавление прошло успешно");
      setUpdate((prev) => !prev);
    } catch (error) {
      alert(`Ошибка: ${error}`);
    }
  }

  return (
    <div className="flex items-center">
      <div className=" mx-auto flex flex-col w-[300px]">
        <span>Превью:</span>

        <Product
          img={formState.preview}
          name={formState.name}
          weight={formState.weight}
          price={formState.price}
          id={0}
          option={"DEV"}
        />
      </div>
      <form
        id="AdminForm"
        className="flex flex-col gap-2 mx-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="name">Название продукта</label>
        <input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={() =>
              setCreateNew((prev) => {
                return !prev;
              })
            }
          >
            <FaExchangeAlt />
          </button>
          <div className="flex flex-col w-full">
            {createNew || !categories?.length ? (
              <>
                <label htmlFor="category">Категория продукта (Новая)</label>
                <input
                  type="text"
                  id="category"
                  value={formState.category}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <label>Категория продукта</label>
                <select defaultValue="" onChange={handleCategory}>
                  <option value="" disabled={true}>
                    Категория
                  </option>
                  {categories.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        <label htmlFor="price">Цена продукта</label>
        <input
          type="number"
          id="price"
          value={formState.price}
          onChange={handleChange}
        />
        <label htmlFor="weight">Порция (вес)</label>
        <input
          type="number"
          id="weight"
          value={formState.weight}
          onChange={handleChange}
        />

        <label htmlFor="img">Изображение</label>
        <input type="file" id="img" onChange={handleChange} />

        <button
          type="submit"
          className="border px-2 py-1 rounded-xl bg-green-400 text-white text-lg"
        >
          САБМИТ
        </button>
      </form>
    </div>
  );
};
