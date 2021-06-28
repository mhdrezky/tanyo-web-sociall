import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeTanyo, unlikeTanyo } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedTanyo = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.tanyoId === this.props.tanyoId
      )
    )
      return true;
    else return false;
  };
  likeTanyo = () => {
    this.props.likeTanyo(this.props.tanyoId);
  };
  unlikeTanyo = () => {
    this.props.unlikeTanyo(this.props.tanyoId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedTanyo() ? (
      <MyButton tip="Undo like" onClick={this.unlikeTanyo}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeTanyo}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tanyoId: PropTypes.string.isRequired,
  likeTanyo: PropTypes.func.isRequired,
  unlikeTanyo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeTanyo,
  unlikeTanyo
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);