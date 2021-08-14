import React, {Component, ReactNode, Suspense, Fragment} from "react";
import router, {IRouter, unAuthRouter} from '../router';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AppLayout from "./AppLayout";

export default class View extends Component {

    generateRouter = (routerList?: IRouter[]): ReactNode => {
        return (
            routerList?.map(r => {
                if (r.children) {
                    return (
                        <Fragment key={r.key}>
                            {this.generateRouter(r.children)}
                        </Fragment>
                    )
                }
                return (
                    <Route path={r.path} key={r.key} exact={r.exact}>{r.component}</Route>
                )
            })
        )
    }

    render() {
        return (
            <>
                <Suspense fallback={<div/>}>
                    <Router>
                        <Switch>

                            <Route path={'/'} exact>
                                <Redirect to={'/dashboard'}/>
                            </Route>
                            <AppLayout>
                                {
                                    this.generateRouter(router)
                                }
                            </AppLayout>

                            <Switch>
                                {
                                    unAuthRouter.map(r => (
                                        <Route path={r.path} key={r.key} exact={r.exact}>{r.component}</Route>))
                                }
                            </Switch>

                        </Switch>


                    </Router>
                </Suspense>
            </>
        );
    }
}




