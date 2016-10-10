export const setToken = (token) => {
  if(window){
    window.localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  return window ? window.localStorage.getItem('token') : null;
};

export const removeToken = () => {
  if(window){
    window.localStorage.removeItem('token');
  }
};

export const map = ( elems, callback, arg) => {
  let value,i=0,k=1,ret=[];
  for ( i in elems ) {
    value = callback( elems[ i ], i, k, arg );
    if ( value != null ) {
      ret.push( value );
    }
    k++;
  }
  return [].concat.apply( [], ret );
};