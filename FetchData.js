// import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from 'actions';
import { fetchDataSuccess } from './src/store/actions/index';
import XMLParser from 'react-xml-parser';
// import fetch from 'cross-fetch'

const fetchData = () => {
    // console.log("fuction came in FetchData.js");
    return dispatch => {
        // console.log("fuction came in dispach");
        var tempDataSource = [];
        fetch('https://space-rental.herokuapp.com/users/get_xml.xml').then((body) => {
            // console.log("body before body.text() is" , body);
            return body.text();
            }).then((body) => {
                // console.log("body after body.text() is" , body);
            var reponseXml = new XMLParser().parseFromString(body);
            
            var sizeofCds = reponseXml.getElementsByTagName('CD').length;
            for(var i=0 ; i<sizeofCds ; i++)
            {
              var obj = {};
              obj["id"] = i+1;
              var sizeofchilds = reponseXml.getElementsByTagName('CD')[i].children.length;
              for (var j=0 ; j<sizeofchilds ; j++)
              {
                var name = reponseXml.getElementsByTagName('CD')[i].children[j].name;
                var value = reponseXml.getElementsByTagName('CD')[i].children[j].value;
                obj[name] = value;
              }
              tempDataSource.push(obj);
            }
            // console.log("fuction came inside return FetchData.js");
            dispatch(fetchDataSuccess(tempDataSource));
            // return tempDataSource;
          }).catch((error) => {
              console.error(error);
          });
    }
}

export default fetchData;