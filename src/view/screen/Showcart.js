import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Showcart() {
  const nav = useNavigate();
  const [cartdata, setCartdata] = useState([]);

  const [data, setData] = useState("");
  const [pay, setPay] = useState("");
  useEffect(() => {
    async function show() {
      try {
        let res = await axios.post("showtocart", {});
        console.log(res?.data);
        setCartdata(res?.data);
        let pay = 0;
        res?.data.map((d) => {
          pay += d.price;
        });
        console.log(pay);
        setPay(pay);
      } catch (error) {
        console.log(error);
      }
    }
    show();
  }, []);
  console.log("**********************");
  console.log(cartdata);
  console.log("**********************");

  async function show() {
    try {
      let res = await axios.post("showtocart", {});
      console.log(res?.data);
      setCartdata(res?.data);
      let pay = 0;
      res?.data.map((d) => {
        pay += d.price;
      });
      console.log(pay);
      setPay(pay);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeitem(index) {
    let arr = [];
    cartdata.map((d, index1) => {
      if (index !== index1) {
        arr.push(d);
      }
    });
    console.log(arr);
    let res = await axios
      .post("removecartitem", arr)
      .catch((e) => console.log(e));
    console.log(res?.data);
    await setData(arr);

    show();
  }

  return (
    <>
      <div className="container my-5">
        <h1 className="mb-3">Your Cart</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Selected Products</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {cartdata.map((product, index) => (
                    <div className="col-md-4 mb-3" key={product.id}>
                      <div className="card h-100">
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.category}</p>
                          <p className="card-text">${product.price}</p>
                        </div>
                        <div className="card-footer">
                          <button
                            className="btn btn-primary"
                            onClick={() => removeitem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-outline-primary"
                id="btn1"
                onClick={() => nav("/")}
              >
                Go to products
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Cart</h5>
              </div>
              <div className="card-body">
                <p>Total Pay : ${pay}</p>
              </div>
              <div className="card-footer">
                <Button onClick={() => nav("/orderplace", { state: pay })}>
                  {" "}
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
