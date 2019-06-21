import React,{Component} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Mybutton extends Component {
  constructor(props){
    super(props);
    this.customstyle = styles;
  }

  componentDidMount(){
    /*
    append customized style to current stylesheet
    */
    this.customstyle = styles;
    this.customstyle.button = {...styles.button,...this.props.style};
    this.customstyle.text = {...styles.text,...{'color':this.props.style.color}};
  }

  render(){
    return (
      <TouchableOpacity style={this.customstyle.button} onPress={this.props.customClick}>
        <Text style={this.customstyle.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );  
  }
  
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#000000',
    backgroundColor:'#98fb98',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius:10,
  },
  text: {
    color: '#000000',
    fontFamily: "RobotoSlab"
  },
});

//default values for props
Mybutton.defaultProps ={
  style:styles.button
};

//check prop types and if it is present
Mybutton.propTypes = {
  
  customClick:PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Mybutton;