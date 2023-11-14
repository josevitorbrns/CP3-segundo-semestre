import moment from 'moment/moment'
import { Text, View } from 'react-native'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import LoadingComponent from '../LoadingComponent'
import { styles } from './styles'

const WeatherChart = ({yDomain, values, hours, color, title}) => {
    const data = values.map((value, index) => {
        return {x: index, y: value}
    })

    const dateFormater = (dateString) => {
        const date = new Date(dateString);
        if (date.getHours() === 0) {
            return moment(date).format('DD/MM');
        } else {
            return moment(date).format('hh:mm');
        }
    }

    const getHour = () => {
        const nowDate = new Date();
        let hours = nowDate.getHours();
        hours += nowDate.getMinutes() / 60;
        return hours;
    }

    return(
        <View style={styles.container}>
            {
                title &&
                <Text style={styles.text}>
                    {`${title}`}
                </Text>
            }
            {
                data.length > 0 ?
                (<Chart
                    style={{ height: '30vh', width: '100vw' }}
                    padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 0, max: 48 }}
                    yDomain={yDomain}
                    >
                    <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                    <HorizontalAxis tickCount={17} theme={{ labels: { formatter: (i) => dateFormater(hours[i]) } }}/>
                    <Area data={data} theme={{ gradient: { from: { color: color.from }, to: { color: color.to } }}} />
                    <Line data={data} theme={{ stroke: { color: color.line, width: 5 } }} />
                    <Line 
                        data={[ {x: getHour(), y: yDomain.min}, {x: getHour(), y: yDomain.max}]}
                        theme={{ stroke: { color: '#aa3', width: 3 } }}
                    />
                </Chart>) :
                <LoadingComponent height={'30vh'} width={'100vw'}/>
            }
        </View>
    )
}

export default WeatherChart;