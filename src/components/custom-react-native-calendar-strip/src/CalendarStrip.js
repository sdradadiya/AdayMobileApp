import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';
import CalendarDay from './CalendarDay';
import moment from 'moment';
import styles from './Calendar.style.js';
import GestureRecognizer from 'react-native-swipe-gestures';

//Just a shallow array of 7 elements
const arr = [];
for (let i = 0; i < 7; i++) {
    arr.push(i);
}
/*
 * Class CalendarStrip that is representing the whole calendar strip and contains CalendarDay elements
 *
 */
export default class CalendarStrip extends Component {

    static propTypes = {
        style: React.PropTypes.any,
        calendarColor: React.PropTypes.string,
        highlightColor: React.PropTypes.string,
        borderHighlightColor: React.PropTypes.string,

        startingDate: React.PropTypes.any,
        selectedDate: React.PropTypes.any,
        onDateSelected: React.PropTypes.func,
        onWeekChanged: React.PropTypes.func,
        useIsoWeekday: React.PropTypes.bool,

        iconLeft: React.PropTypes.any,
        iconRight: React.PropTypes.any,
        iconStyle: React.PropTypes.any,
        iconLeftStyle: React.PropTypes.any,
        iconRightStyle: React.PropTypes.any,
        iconContainer: React.PropTypes.any,

        calendarHeaderStyle: React.PropTypes.any,
        calendarHeaderFormat: React.PropTypes.string,
        hours:React.PropTypes.any,

        calendarAnimation: React.PropTypes.object,
        selection: React.PropTypes.string,
        selectionAnimation: React.PropTypes.object,

        dateNameStyle: React.PropTypes.any,
        dateNumberStyle: React.PropTypes.any,
        weekendDateNameStyle: React.PropTypes.any,
        weekendDateNumberStyle: React.PropTypes.any,
        highlightDateNameStyle: React.PropTypes.any,
        highlightDateNumberStyle: React.PropTypes.any,
        styleWeekend: React.PropTypes.bool,

        locale: React.PropTypes.object,

        borderBottomColor: React.PropTypes.string,
        keepSelectedDateInCenter: React.PropTypes.bool,
    };

    static defaultProps = {
        startingDate: moment(),
        useIsoWeekday: true,
        iconLeft: require('../../assets/left-arrow-white.png'),
        iconRight: require('../../assets/right-arrow-white.png'),
        calendarHeaderFormat: 'MMMM YYYY'
        //calendarHeaderFormat:'Week start March 23: 30h 20h 10h'
    };

    constructor(props) {
        super(props);

        if (props.locale) {
            if (props.locale.name && props.locale.config) {
                moment.locale(props.locale.name, props.locale.config);
            } else {
                throw new Error('Locale prop is not in the correct format. \b Locale has to be in form of object, with params NAME and CONFIG!');
            }
        }

        const startingDate = this.setLocale(moment(this.props.startingDate));
        const selectedDate = this.setLocale(moment(this.props.selectedDate));

        this.state = {
            startingDate,
            selectedDate
        };

        this.resetAnimation();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
        this.getDatesForWeek = this.getDatesForWeek.bind(this);
        this.getPreviousWeek = this.getPreviousWeek.bind(this);
        this.getNextWeek = this.getNextWeek.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.isDateSelected = this.isDateSelected.bind(this);
        this.formatCalendarHeader = this.formatCalendarHeader.bind(this);
        this.animate = this.animate.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
    }

    //Animate showing of CalendarDay elements
    componentDidMount() {
        this.animate();
    }

    //Receiving props and set selected date
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
            const selectedDate = this.setLocale(moment(nextProps.selectedDate));
            this.setState({
                selectedDate
            });
        }
    }

    //Only animate CalendarDays if the selectedDate is the same
    //Prevents animation on pressing on a date
    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedDate === this.state.selectedDate) {
            this.resetAnimation();
            this.animate();
        }
    }

    //Function that checks if the locale is passed to the component and sets it to the passed moment instance
    setLocale(momentInstance) {
        if (this.props.locale) {
            momentInstance.locale(this.props.locale.name);
        }
        return momentInstance;
    }

    //Set startingDate to the previous week
    getPreviousWeek() {
        const previousWeekStartDate = moment(this.props.startingDate).subtract(1, 'w');
        this.setState({startingDate: previousWeekStartDate});
        if (this.props.onWeekChanged) {
            this.props.onWeekChanged(previousWeekStartDate.clone().startOf(this.props.useIsoWeekday ? 'isoweek' : 'week'));
        }
        const selectedDate = this.setLocale(moment(this.props.startingDate).subtract(1, 'w'));
        this.setState({
            selectedDate
        });
        this.props.renderFilter(selectedDate);
    }

    //Set startingDate to the next week
    getNextWeek() {
        const nextWeekStartDate = moment(this.props.startingDate).add(1, 'w');
        this.setState({startingDate: nextWeekStartDate});
        if (this.props.onWeekChanged) {
            this.props.onWeekChanged(nextWeekStartDate.clone().startOf(this.props.useIsoWeekday ? 'isoweek' : 'week'));
        }
        const selectedDate = this.setLocale(moment(this.props.startingDate).add(1, 'w'));
        this.setState({
            selectedDate
        });
        this.props.renderFilter(selectedDate);
    }

    //Get dates for the week based on the startingDate
    //Using isoWeekday so that it will start from Monday
    getDatesForWeek() {
        const me = this;
        let dates = [];
        let startDate = moment(this.state.startingDate);

        arr.forEach((item, index) => {
            let date;
            if (me.props.useIsoWeekday) {
                date = me.setLocale(moment(startDate.isoWeekday(index + 1)));
            }
            else {
                if (me.props.keepSelectedDateInCenter) {
                    let k = 0;
                    date = me.setLocale(moment(me.state.selectedDate).add(k + index, 'days'));
                    if (index === 0)
                        this.setState
                }
                else
                    date = me.setLocale(moment(startDate).add(index, 'days'));
            }
            dates.push(date);
        });
        return dates;
    }

    //Handling press on date/selecting date
    onDateSelected(date) {
        if (this.props.onDateSelected) {
            this.props.onDateSelected(date);
        }
        this.setState({selectedDate: this.props.selectedDate});
    }

    //Function to check if provided date is the same as selected one, hence date is selected
    //using isSame moment query with 'day' param so that it check years, months and day
    isDateSelected(date) {
        return date.isSame(this.state.selectedDate, 'day');
    }

    //Function for reseting animations
    resetAnimation() {
        this.animatedValue = [];
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0);
        });
    }

    //Function to animate showing the CalendarDay elements.
    //Possible cases for animations are sequence and parallel
    animate() {
        if (this.props.calendarAnimation) {
            let animations = arr.map((item) => {
                return Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: this.props.calendarAnimation.duration,
                        easing: Easing.linear
                    }
                );
            });


            if (this.props.calendarAnimation.type.toLowerCase() === 'sequence') {
                Animated.sequence(animations).start();
            } else {
                if (this.props.calendarAnimation.type.toLowerCase() === 'parallel') {
                    Animated.parallel(animations).start();
                } else {
                    throw new Error('CalendarStrip Error! Type of animation is incorrect!');
                }
            }
        }
    }

    //Function that formats the calendar header
    //It also formats the month section if the week is in between months

    weeklyHours=()=>{
        let h=this.props.hours;
        let newDate=moment(this.props.hoursStart).format("YYYY-MM-DD");
        let end = null;
        if (h[newDate]){
            end=h[newDate].booked + "h " + h[newDate].pending + "h " + h[newDate].open + "h";
        }
        //console.log("Hello",h[newDate]);
        //console.log("In Calender Strip date",moment(this.state.selectedDate._i).format("YYYY-MM-DD"));
        //console.log("In Calender Strip",h)

        if (end) { 
        return(
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle,{color:'#00A863',fontWeight:'900',margin:5}]}>
                    {h[newDate].booked + "h "}
                </Text>
                <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle,{color:'#FFAD33',fontWeight:'900',marginRight:5}]}>
                    {h[newDate].pending + "h "}
                </Text>
                <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle,{color:'#E33820',fontWeight:'900',marginRight:5}]}>
                    {h[newDate].open + "h "}
                </Text>
            </View>
        )
        }
    }

    formatCalendarHeader() {
        let firstDay = this.getDatesForWeek()[0];
        let lastDay = this.getDatesForWeek()[this.getDatesForWeek().length - 1];
        let monthFormatting = '';

        let start='Week Starting ';

        //Parsing the month part of the user defined formating
        if ((this.props.calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
            monthFormatting = 'Mo';
        } else {
            if ((this.props.calendarHeaderFormat.match(/M/g) || []).length > 0) {
                for (let i = (this.props.calendarHeaderFormat.match(/M/g) || []).length; i > 0; i--) {
                    monthFormatting += 'M';
                }
            }
        }

        if (firstDay.month() === lastDay.month()) {
            return start + " " + firstDay.format("MMMM D") + ": " ;
        }

        if (firstDay.year() !== lastDay.year()) {
            return `${start} ${firstDay.format("MMMM D")} / ${lastDay.format(this.props.calendarHeaderFormat)} ": "`;
        }
        return start + " " + firstDay.format("MMMM D") + ": " ;
        //return `${monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ''} ${monthFormatting.length > 1 ? '/' : ''} ${lastDay.format(this.props.calendarHeaderFormat)}s` ;
    }

    onSwipeLeft(gestureState) {
        this.getNextWeek();
    }

    onSwipeRight(gestureState) {
        this.getPreviousWeek();
    }

    render() {
        let opacityAnim = 1;

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        let datesRender = this.getDatesForWeek().map((date, index) => {
            if (this.props.calendarAnimation) {
                opacityAnim = this.animatedValue[index];
            }
            return (
                <Animated.View key={date} style={{opacity: opacityAnim, flex: 1, alignItems:'center'}}>
                    <CalendarDay
                        date={date}
                        key={date}
                        selected={this.isDateSelected(date)}
                        onDateSelected={this.onDateSelected}
                        calendarColor={this.props.calendarColor}
                        highlightColor={this.props.highlightColor}
                        dateNameStyle={this.props.dateNameStyle}
                        dateNumberStyle={this.props.dateNumberStyle}
                        weekendDateNameStyle={this.props.weekendDateNameStyle}
                        weekendDateNumberStyle={this.props.weekendDateNumberStyle}
                        highlightDateNameStyle={this.props.highlightDateNameStyle}
                        highlightDateNumberStyle={this.props.highlightDateNumberStyle}
                        styleWeekend={this.props.styleWeekend}
                        selection={this.props.selection}
                        selectionAnimation={this.props.selectionAnimation}
                        borderHighlightColor={this.props.borderHighlightColor}
                        borderBottomColor={this.props.borderBottomColor}
                    />
                </Animated.View>
            );
        });
        return (
            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={[styles.calendarContainer, {backgroundColor: this.props.calendarColor}, this.props.style]}
            >
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle,{fontWeight:'900'}]}>
                        {this.formatCalendarHeader()}
                    </Text>
                    {this.weeklyHours()}
                </View>

                <View style={styles.datesStrip}>
                    <View style={styles.calendarDates}>
                        {datesRender}
                    </View>
                </View>
            </GestureRecognizer>
        );
    }
}
