import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Notification, translate, userLogin as userLoginAction } from 'admin-on-rest';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {
  Avatar,
  Card,
  CardActions,
  RaisedButton,
} from 'material-ui';
import open from 'oauth-open';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
        padding: '1em',
    },
    avatar: {
        margin: '1em',
        textAlign: 'center ',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
    },
    hint: {
        textAlign: 'center',
        marginTop: '1em',
        color: '#ccc',
    },
};

function getColorsFromTheme(theme) {
  if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
  const {
    palette: {
      primary1Color,
      accent1Color,
    },
  } = theme;
  return { primary1Color, accent1Color };
}

class AppLogin extends Component {
  login = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:org,user:email&response_type=code`;
    const { userLogin, location } = this.props;
    open(oauthUrl, (err, code) => userLogin(code, location.state ? location.state.nextPathname : '/'));
  }

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;
    const muiTheme = getMuiTheme(theme);
    const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ ...styles.main, backgroundColor: primary1Color }}>
          <Card style={styles.card}>
            <div style={styles.avatar}>
              <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
            </div>
            <p style={styles.hint}>{translate('hookr.login.prompt')}</p>
            <form onSubmit={handleSubmit(this.login)}>
              <CardActions>
                <RaisedButton
                  type="submit"
                  primary
                  disabled={submitting}
                  label={translate('hookr.login.action')}
                  fullWidth
                />
              </CardActions>
            </form>
          </Card>
          <Notification />
        </div>
      </MuiThemeProvider>
    );
  }
}

AppLogin.propTypes = {
  ...propTypes,
  authClient: PropTypes.func,
  previousRoute: PropTypes.string,
  theme: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

AppLogin.defaultProps = {
  theme: {},
};

const enhance = compose(
  translate,
  reduxForm({
    form: 'signIn',
    validate: (values, props) => {
      const errors = {};
      const { translate } = props;
      if (!values.username) errors.username = translate('aor.validation.required');
      if (!values.password) errors.password = translate('aor.validation.required');
      return errors;
    },
  }),
  connect(null, { userLogin: userLoginAction }),
);

export default enhance(AppLogin);
