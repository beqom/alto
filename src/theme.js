const palette = {
  reds: {
    $90: '#4D0008',
    $80: '#74000C',
    $70: '#93000F',
    $60: '#C30014',
    $50: '#DD4554',
    $40: '#EB6D7A',
    $30: '#F79AA3',
    $20: '#FFCAD0',
    $10: '#FFF1F3',
  },
  oranges: {
    $90: '#552B00',
    $80: '#904900',
    $70: '#C76400',
    $60: '#E57D14',
    $50: '#F3993E',
    $40: '#FDB973',
    $30: '#FFCC98',
    $20: '#FFE1C3',
    $10: '#FFF5EC',
  },
  yellows: {
    $90: '#524700',
    $80: '#938100',
    $70: '#BAA50A',
    $60: '#E8CE16',
    $50: '#EDD73C',
    $40: '#EEDE6E',
    $30: '#F4E896',
    $20: '#F9F3C5',
    $10: '#FDFCF1',
  },
  limes: {
    $90: '#304D00',
    $80: '#4A7305',
    $70: '#60940A',
    $60: '#77AF1A',
    $50: '#8CC332',
    $40: '#9FCE52',
    $30: '#C1E683',
    $20: '#DAF2B2',
    $10: '#F6FFE8',
  },
  greens: {
    $90: '#003909',
    $80: '#035410',
    $70: '#156A23',
    $60: '#208831',
    $50: '#43A953',
    $40: '#6FC77D',
    $30: '#A3E5AD',
    $20: '#C9F1CF',
    $10: '#F4FFF6',
  },
  pines: {
    $90: '#003B2C',
    $80: '#005641',
    $70: '#09795E',
    $60: '#189B7C',
    $50: '#2CAB8C',
    $40: '#50BEA4',
    $30: '#93DCCA',
    $20: '#C5F4E9',
    $10: '#F1FFFC',
  },
  teals: {
    $90: '#003F4D',
    $80: '#04596D',
    $70: '#047792',
    $60: '#078CAA',
    $50: '#17ABCD',
    $40: '#44C2DF',
    $30: '#85DAEE',
    $20: '#BEF0FB',
    $10: '#E8FBFF',
  },
  blues: {
    $90: '#002C55',
    $80: '#02417C',
    $70: '#005BB1',
    $60: '#0074E0',
    $50: '#2D91EE',
    $40: '#4DA5F6',
    $30: '#82C1FA',
    $20: '#B1D9FF',
    $10: '#F3F9FF',
  },
  indigos: {
    $90: '#14004D',
    $80: '#22027E',
    $70: '#3005AD',
    $60: '#4311D2',
    $50: '#5D38E7',
    $40: '#7A6CF3',
    $30: '#A3A3FF',
    $20: '#D2D2FC',
    $10: '#F1F1FF',
  },
  purples: {
    $90: '#2A0144',
    $80: '#3C065F',
    $70: '#5A1885',
    $60: '#732EA0',
    $50: '#8B45B8',
    $40: '#A969D3',
    $30: '#CD9AEE',
    $20: '#EBCDFF',
    $10: '#F9F1FF',
  },
  pinks: {
    $90: '#5A0038',
    $80: '#870756',
    $70: '#981E6A',
    $60: '#AF3882',
    $50: '#CA549D',
    $40: '#DF7AB9',
    $30: '#F19BD0',
    $20: '#FCBEE4',
    $10: '#FEE5F4',
  },
  coolGreys: {
    $90: '#192328',
    $80: '#333C48',
    $70: '#3F4F5E',
    $60: '#4F6376',
    $50: '#5F788C',
    $40: '#8096AC',
    $30: '#A2B8CE',
    $20: '#C4D7EB',
    $10: '#EBF2F9',
  },
  neutralGreys: {
    $90: '#242424',
    $80: '#303030',
    $70: '#4C4C4C',
    $60: '#606060',
    $50: '#757575',
    $40: '#979797',
    $30: '#B8B8B8',
    $20: '#D9D9D9',
    $10: '#F2F2F2',
  },
  warmGreys: {
    $90: '#231919',
    $80: '#302929',
    $70: '#4C4343',
    $60: '#605757',
    $50: '#746B6B',
    $40: '#978E8E',
    $30: '#B6B0B0',
    $20: '#D9D4D4',
    $10: '#F2EDED',
  },
};

palette.red = palette.reds.$60;
palette.orange = palette.oranges.$60;
palette.yellow = palette.yellows.$60;
palette.lime = palette.limes.$60;
palette.green = palette.greens.$60;
palette.pine = palette.pines.$60;
palette.teal = palette.teals.$60;
palette.blue = palette.blues.$60;
palette.indigo = palette.indigos.$60;
palette.purple = palette.purples.$60;
palette.pink = palette.pinks.$60;
palette.coolGrey = palette.coolGreys.$80;
palette.neutralGrey = palette.neutralGreys.$50;
palette.warmGrey = palette.warmGreys.$70;

export default {
  palette,
  colors: {
    primary: 'blue',
    error: 'red',
    success: 'green',
    text: 'coolGrey',
  },
  borderRadius: '3px',
  transition: '.15s ease-in-out',
  fontSize: {
    small: '.875em', // 14px
    medium: '1rem',  // 16px
    large: '1.125rem', // 18px
  },
};
