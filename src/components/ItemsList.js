import React, { useEffect, useState, useTransition } from "react";
import itemService from "../services/item.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterItems from "./FilterItems";
import { withTranslation , UseTranslationOptions, useTranslation} from "react-i18next";
import "../config"


const ItemsList = () => {
  const {t, config}= useTranslation();
  const [items, setItems] = useState([]);
  const [filterTextValue, setFilterTextValue] = useState('All');
  const filteredItemList = items.filter((product) => {
    if(filterTextValue === 'Aktyvus'){
      return product.statusas === 'Aktyvus';
    } else if(filterTextValue === 'Neaktyvus'){
      return product.statusas === 'Neaktyvus';
    } else {
      return product;
    }
  });
const onFilterValueSelected = (filterValue) => { setFilterTextValue(filterValue)}
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    itemService
      .getAll()
      .then((response) => {
        console.log("Printing Items data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    itemService
      .remove(id)
      .then((response) => {
        console.log("Item deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };
  
  return (
    <div className="container">
      <h3> {t('itemslist')}</h3>
      <hr />
      <div>
        <Link
          to="/items/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          {t('additem')}
        </Link>
        <FilterItems filterValueSelected={onFilterValueSelected}></FilterItems>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>{t('itemname')}</th>
              <th>{t('itemcode')}</th>
              <th>{t('itemdesc')}</th>
              <th>{t('itemgroup')}</th>
              <th>{t('itemstatus')}</th>
              <th>{t('actions')}</th>
            </tr>
            
          </thead>
          
          
          
          <tbody>
          
            {filteredItemList.map((item) => (
              <tr key={item.id}>
                <td>{item.pavadinimas}</td>
                <td>{item.kodas}</td>
                <td>{item.aprasymas}</td>
                <td>{item.grupe}</td>
                <td>{item.statusas}</td>
                <td>
                  <Link
                    to={`/items/edit/${item.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    {t('refresh')}
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                  >
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withTranslation()(ItemsList);
