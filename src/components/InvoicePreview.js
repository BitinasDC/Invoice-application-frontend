import { Link, useParams } from "react-router-dom";
import invoiceService from "../services/invoice.service";
import React, { useEffect, useState, useRef } from "react";
import "../styles/invoice.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
import codeAcademy from "../images/codeacademy.png";
import AuthService from "../services/auth.service";

const InvoicePreview = () => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { id } = useParams();
  const [customerId, setCustomerId] = useState([]);
  const [suma, setSuma] = useState([]);
  const [bendraSuma, setBendraSuma] = useState("");
  const [bendraSumaSuPvm, setBendraSumaSuPvm] = useState("");
  const [PVM, SetPvm] = useState([]);
  const user = AuthService.getCurrentUser();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (id) {
      invoiceService
        .get(id)
        .then((response) => {
          console.log("Printing Invoices data", response.data); ///////////////////////////
          setInvoiceItems(response.data.invoiceItems);
          setCustomerId(response.data.customerId);
          setInvoice(response.data);
          countSuma(response.data.invoiceItems);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  let countSuma = (invoiceItems) => {
    setBendraSuma(0);
    var sumaCount = 0;
    const list = [...suma];
    invoiceItems.map(
      (item, index) => (
        (list[index] =
          invoiceItems[index].item.bazineKaina *
          Number(invoiceItems[index].quantity)),
        setSuma(list),
        console.log("numeris: " + list[index]), /////////
        (sumaCount += list[index]),
        setBendraSuma(sumaCount.toFixed(2)),
        setBendraSumaSuPvm((sumaCount * 1.21).toFixed(2)),
        SetPvm((sumaCount * 0.21).toFixed(2))
      )
    );
  };

  return (
    <div className="saskaitos-sablonas">
      <div style={{ textAlign: "center" }}>
        <button onClick={handlePrint} className="btn btn-outline-primary">
          Spausdinti
        </button>
      </div>
      <div className="bendras" ref={componentRef}>
        <img className="invoice-logo" src={codeAcademy} />

        <table className="sask-info">
          <tbody>
            <tr>
              <td>
                <span>S??skaitos Nr: </span>
                {invoice.invoiceNumber}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>Pirk??jas: </span>
                {customerId.vardas} {customerId.pavarde}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>Data: </span>
                {invoice.myDate}
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <span>Adresas: </span>
                {customerId.adresas}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <table className="line-items-container">
          <thead>
            <tr>
              <th className="heading-description">Prek??s kodas</th>
              <th className="heading-description">Prek??s pavadinimas</th>
              <th className="heading-quantity">Kiekis</th>
              <th className="heading-price">Kaina</th>
              <th className="heading-subtotal">Suma</th>
            </tr>
          </thead>
          <tbody className="item">
            {invoiceItems.map((item, index) => (
              <tr key={index}>
                <td> {invoiceItems[index].item.kodas} </td>
                <td> {invoiceItems[index].item.pavadinimas} </td>
                <td> {invoiceItems[index].quantity} </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {invoiceItems[index].item.bazineKaina}{" "}
                </td>
                <td> {suma[index].toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p className="pvm">
            <strong>Suma: </strong>
            {bendraSuma}{" "}
          </p>
          <p className="pvm">
            <strong>PVM (21%): </strong>
            {PVM}{" "}
          </p>
          <p className="pvm">
            <strong>Suma su PVM: </strong>
            {bendraSumaSuPvm}
          </p>
        </div>

        <table className="line-items-container has-bottom-border">
          <thead>
            <tr>
              <th> Mok??jimo informacija </th>
              <th> Mok??jimo terminas </th>
              <th> Viso: </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ textAlign: "left" }}>
                  Mok??jimo s??skaitos Nr.: <strong>123567744</strong>
                </div>
              </td>
              <td style={{ textAlign: "left" }}>
                <strong>2022-12-31</strong>
              </td>
              <td className="large total">{bendraSumaSuPvm} EUR</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: "25px", fontSize: "14px" }}>Pastabos: </p>
        <p style={{ marginTop: "75px", fontSize: "18px" }}>
          S??skait?? i??ra????: <strong>{user.username}</strong>
        </p>
        <hr />
        <p style={{ marginTop: "25px", fontSize: "18px" }}>S??skait?? gavo: </p>
        <hr />
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Link to="/invoices">Atgal ?? s??ra????</Link>
      </div>
    </div>
  );
};

export default InvoicePreview;
