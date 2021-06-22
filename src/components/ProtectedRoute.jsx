import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserDashBoard from "./UserDashboard";
const PrivateRoute = ({LogedUser,props}) => {
    return(
        <Route>
            {
                LogedUser.loged ? (<UserDashBoard/>):(<Redirect to="/"/>)
            }
        </Route>
    )
}

const mapStateToProps = (state) => ({
    LogedUser: state.LogedUser
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute)