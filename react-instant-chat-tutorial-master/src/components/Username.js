import React from 'react';


var Username = React.createClass ({

      render: function () {
      const userJoin = this.props.userJoined;

      var allUser = userJoin[userJoin.length-1];
      if (userJoin.length >= 1){
        return (<div>
          <div className = 'alert-box'>{allUser +' joined!'}</div>

            </div>);
      } else return false
    }
  });

Username.defaultProps = {

};

export default Username;
