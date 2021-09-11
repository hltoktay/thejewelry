import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';

export default function settings() {

    const [ state, dispatch ] = useContext(DataContext);
    const { auth, notify, orders } = state


    return (

         <div className="order_detail_page container mt-5">
        <Head>
          <title>Order Details</title>
        </Head>

        <div className="container justify-content-around">
         <div className="row g-5">
            <div className="col-md-6 col-lg-5 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span>Order Details</span>
             
              </h4>

              <table className="table-bordered table-hover w-100 text-uppercase table-responsive"
                style={{ minWidth: '600px', cursor: 'pointer' }}>
                <thead className="bg-light fw-bolder">
                  <tr>
                    <td className="p-2">id</td>
                    <td className="p-2">date</td>
                    <td className="p-2">total</td>
                    <td className="p-2">delivered</td>
                    <td className="p-2">paid</td>
                  </tr>
                </thead>

                <tbody>
                  {
                    orders.map(order => (
                      <tr key={order._id}>
                        <td className="p-2">
                          <Link href={`/order/${order._id}`}>
                            <a>{order._id}</a>
                          </Link>

                        </td>
                        <td className="p-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2">${order.total}</td>
                        <td className="p-2">
                          {
                            order.delivered
                              ? <i className="fas fa-check text-success"></i>
                              : <i className="fas fa-times text-danger"></i>
                          }
                        </td>
                        <td className="p-2">
                          {
                            order.paid
                              ? <i className="fas fa-check text-success"></i>
                              : <i className="fas fa-times text-danger"></i>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>
             
            </div>

        </div>
        </div>
        </div>
    )
}
