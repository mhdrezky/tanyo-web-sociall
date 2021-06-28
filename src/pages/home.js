import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Tanyo from '../components/tanyo/Tanyo';
import Profile from '../components/profile/Profile';
import TanyoSkeleton from '../util/TanyoSkeleton';

import { connect } from 'react-redux';
import { getTanyos } from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount() {
        this.props.getTanyos();
      }
      render() {
        const { tanyos, loading } = this.props.data;
        let recentTanyosMarkup = !loading ? (
          tanyos.map((tanyo) => <Tanyo key={tanyo.tanyoId} tanyo={tanyo} />)
        ) : (
          <TanyoSkeleton />
        );
        return (
          <Grid container spacing={1}>
            <Grid item sm={8} xs={12}>
              {recentTanyosMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
              <Profile />
            </Grid>
          </Grid>
        );
      }
    }
    
    home.propTypes = {
      getTanyos: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired
    };
    
    const mapStateToProps = (state) => ({
      data: state.data
    });
    
    export default connect(
      mapStateToProps,
      { getTanyos }
    )(home);