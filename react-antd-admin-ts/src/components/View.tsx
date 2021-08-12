import React, {Component, Suspense} from "react";
import router from '../router';
import {BrowserRouter as Router, Route} from 'react-router-dom';
export default class View extends Component<any, any>{
    render() {
        return (
            <>
                <Suspense fallback={<div/>}>
                    <Router>
                        {
                            router.map(r => (<Route path={r.path} key={r.key} exact={r.exact}>{r.component}</Route>))
                        }
                    </Router>
                </Suspense>
            </>
        );
    }
}




