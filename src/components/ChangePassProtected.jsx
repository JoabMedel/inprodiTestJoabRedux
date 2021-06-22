import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RessetPassword from "./ressetPassword";

const PrivateRouteChangePassword = ({UserToken,props}) => {
    return(
        <Route>
            {
                UserToken==="" ? (<Redirect to="/" />):(<RessetPassword />)
            }
        </Route>
    )
}

const mapStateToProps = (state) => ({
    UserToken: state.UserToken
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRouteChangePassword)