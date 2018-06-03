var React = require('react');
var PropTypes = require('prop-types');

class RoomHeader extends React.Component{
	render () {
		return(
		<header className="m-main__header">
            <a href="#" className="m-del-chanel"></a>
           	<p className="m-header__heading">
           		{this.props.headername}
           	</p>
           	<form>
           		<input type="search" name="m-search" id="m-search" placeholder="Поиск" />
           	</form>
         </header>
		)
	}
}

module.exports = RoomHeader;