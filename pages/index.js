import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData , postData } from '../utils/fetchData';

import { useRouter } from 'next/router'

const Main = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state;

  return (
    <> 
      <main style={{ height: "100%" }}>
      
        <div style={{minHeight: "25px",
            fontSize: "14px",
            paddingLeft: "10px",
            backgroundColor: "white",
            letterSpacing: "2px",
            fontWeight: '600',
            fontFamily: "arial", 
            }}>
          <ul class="list-inline mx-4">
            <li class="list-inline-item"><a href="">New *</a> </li>
            <li class="list-inline-item mx-2"><a href="">Gold *</a></li>
            <li class="list-inline-item mx-2"><a href="">Silver *</a></li>
            <li class="list-inline-item mx-2"><a href="">Most Populer *</a></li>
            <li class="list-inline-item mx-2"><a href="">All Products </a></li>
          </ul>
        </div>

        <div class="d-md-flex flex-md-equal">
          <div className="col-md-3 col-sm-2">
            <li class="pt-3 pt-md-5 text-center text-white list-unstyled">
              <a
                href="/about-us"
                class="col-3 pt-3 px-3 pt-md-5 text-center text-white"
              >
                <img
                  style={{ width: "100%" }}
                  src="https://cdn.shopify.com/s/files/1/1115/6326/products/B1013_BespokeDesign_1005-main_large.jpg?v=1618676186"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class="pt-3 pt-md-5 text-center text-white list-unstyled">
              <a
                href="/register"
                class="col-3 pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://cdn.shopify.com/s/files/1/0015/7489/5690/files/CZ-Rings-square-banner-nb-7-8-20.jpg"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class=" pt-3 pt-md-5 text-center text-white list-unstyled">
              <a
                href="/login"
                class="col-3  pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://ae01.alicdn.com/kf/H7d2d46d677ee4750801174ec8909f5beR.jpg"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class=" pt-3 pt-md-5 text-center text-white list-unstyled">
              <a
                href="/company-policy"
                class="col-3 pt-3 px-3 pt-md-5 text-center text-white"
              >
                <img
                  style={{ width: "100%" }}
                  src="https://cdn.shopify.com/s/files/1/1115/6326/products/B1013_BespokeDesign_1005-main_large.jpg?v=1618676186"
                />
              </a>
            </li>
          </div>
        </div>

        <div class="d-md-flex flex-md-equal">
          <div className="col-md-3 col-sm-2">
            <li class="text-center text-white list-unstyled">
              <a
                href={auth.user ? '/main' : '/login'}
                class="col-3 pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://storage.pixteller.com/designs/designs-images/2020-12-21/05/diamond-ring-jewelry-sale-banner-1-5fe0c462110c6.png"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class="text-center text-white list-unstyled">
              <a
                href={auth.user ? '/main' : '/login'}
                class="col-3  pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://alitools.io/en/showcase/image?url=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH3dbb1ec7d4464b4baa34207a7bdcafe7L.jpg"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class="text-center text-white list-unstyled">
              <a
                href={auth.user ? '/main' : '/login'}
                class="col-3  pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://silver-by-mail.s3-eu-west-1.amazonaws.com/p/xl/P2820/P2820_01.jpg"
                />
              </a>
            </li>
          </div>

          <div className="col-md-3 col-sm-2">
            <li class="text-center text-white list-unstyled">
              <a
                href={auth.user ? '/main' : '/login'}
                class="col-3 pt-3 px-3 pt-md-5 text-center text-white "
              >
                <img
                  style={{ width: "100%" }}
                  src="https://img.joomcdn.net/ad66685b96091823f62977fc4df3533b6b67abcb_original.jpeg"
                />
              </a>
            </li>
          </div>
        </div>

        <div className="col-md-12 col-sm-12 mt-3">
          <li class="text-center text-white list-unstyled">
            <a href={auth.user ? '/main' : '/login'} class="col-3 pt-3 px-3 pt-md-5 text-center text-white ">
              <img
                style={{ width: "100%" }}
                src="https://lovelyliriodesigns.files.wordpress.com/2016/05/jewelrybanner.jpg"
              />
            </a>
          </li>
        </div>
      </main>
    </>
  );
};

export default Main;
