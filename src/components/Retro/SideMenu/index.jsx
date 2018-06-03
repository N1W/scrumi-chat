import React from 'react';
import PropTypes from 'prop-types';
import FinishRetro from '@/components/Retro/FinishRetro'
import MyPartners from '@/components/Retro/MyPartners/MyPartners'
import usersArr from '@/components/Retro/MyPartners/users'
import SkypeButton from '@/components/Retro/MyPartners/SkypeButton/SkypeButton'

import './styles.scss';



class SideMenu extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
    };
  }
  onSwitch = () => {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible,
    });
  };

  render() {
    return (
      <div className="sidemenu_wrapper">
        <div className="side_menu_cont">
          <a
            onClick={this.onSwitch}
            className="side_sticker"
          >Меню</a>
          {this.state.isMenuVisible && <div className="side_menu">
            <div className="my_partners_list_container">
              <h4 className="my_partners_list_container__title">Моя команда</h4>
              <MyPartners data={usersArr}/>
            </div>
            <SkypeButton />
            <FinishRetro />
          </div>}
        </div>
      </div>
    );
}
  }

export default SideMenu;
