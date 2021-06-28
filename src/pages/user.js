import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tanyo from '../components/tanyo/Tanyo';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import TanyoSkeleton from '../util/TanyoSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    tanyoIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const tanyoId = this.props.match.params.tanyoId;

    if (tanyoId) this.setState({ tanyoIdParam: tanyoId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { tanyos, loading } = this.props.data;
    const { tanyoIdParam } = this.state;

    const tanyosMarkup = loading ? (
      <TanyoSkeleton />
    ) : tanyos === null ? (
      <p>No tanyos from this user</p>
    ) : !tanyoIdParam ? (
      tanyos.map((tanyo) => <Tanyo key={tanyo.tanyoId} tanyo={tanyo} />)
    ) : (
      tanyos.map((tanyo) => {
        if (tanyo.tanyoId !== tanyoIdParam)
          return <Tanyo key={tanyo.tanyoId} tanyo={tanyo} />;
        else return <Tanyo key={tanyo.tanyoId} tanyo={tanyo} openDialog />;
      })
    );

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {tanyosMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);