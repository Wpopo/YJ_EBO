import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SiteMap from 'Constants/sitemap';
import LeftMenu from 'Layout/LeftMenu';
import Header from 'Layout/Header';
import MessagePopup from 'Layout/MessagePopup';
import Notification from 'Layout/Notification';
import Loading from 'BaseComponent/Loading';
import styles from './index.module.scss';

const bo_main_view = ({ rootPath }) => (
  <>
    {/* MBO Content */}
    <div className={styles.mboContent}>
      {/* MBO Left Menu */}
      <LeftMenu />
      <div className={styles.right}>
        {/* MBO Right Header */}
        <Header />
        {/* MBO Right Content Router */}
        <div className={styles.content}>
          <Switch>
            {Object.entries(SiteMap).map(([key]) =>
              SiteMap[key].routes.map((route, i) =>
                route.routes ? (
                  route.routes.map((subRoutes, idx2) => (
                    <Route
                      key={idx2}
                      path={`${rootPath}${subRoutes.path}`}
                      exact={subRoutes.exact}
                      component={subRoutes.component}
                    />
                  ))
                ) : (
                  <Route
                    key={i}
                    path={`${rootPath}${route.path}`}
                    exact={route.exact}
                    component={route.component}
                  />
                )
              )
            )}
          </Switch>
        </div>
      </div>
    </div>
    <MessagePopup />
    <Notification />
    <Loading />
  </>
);

export default bo_main_view;
