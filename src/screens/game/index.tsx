import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {THEME} from '../../constants/theme';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const GRID_SIZE = 15;
const CELL_SIZE = width / GRID_SIZE;
const INITIAL_SNAKE = [{x: 5, y: 5}];
const INITIAL_FOOD = {x: 10, y: 10};
const DIRECTIONS = {
  UP: {x: 0, y: -1},
  DOWN: {x: 0, y: 1},
  LEFT: {x: -1, y: 0},
  RIGHT: {x: 1, y: 0},
};

const App = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  useEffect(() => {
    if (checkCollision()) {
      endGame();
    }
  }, [snake]);

  const moveSnake = () => {
    if (isGameOver) return;

    const head = snake[snake.length - 1];
    const newHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    const newSnake = [...snake, newHead];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood());
    } else {
      newSnake.shift(); // Remove tail
    }

    setSnake(newSnake);
  };

  const changeDirection = (newDirection: any) => {
    if (
      (direction.x === -newDirection.x && direction.y === -newDirection.y) ||
      isGameOver
    ) {
      return;
    }
    setDirection(newDirection);
  };

  const checkCollision = () => {
    const head = snake[snake.length - 1];

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }

    return false;
  };

  const generateFood = () => {
    let newFood: any;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      if (
        !snake.some(
          segment => segment.x === newFood.x && segment.y === newFood.y,
        )
      ) {
        break;
      }
    }
    return newFood;
  };

  const endGame = () => {
    setIsGameOver(true);
    Alert.alert('Game Over', `Your score: ${snake.length}`, [
      {text: 'Restart', onPress: resetGame},
    ]);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.RIGHT);
    setIsGameOver(false);
  };

  return (
    <LinearGradient
      colors={['#2980b9', '#6dd5fa', '#ffffff']}
      style={styles.container}>
      <StatusBar animated={true} backgroundColor="#2980b9" />
      <Text style={styles.score}>Score: {snake.length - 1}</Text>
      <View style={styles.grid}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.cell,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                backgroundColor: 'green',
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.cell,
            {
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              backgroundColor: 'red',
            },
          ]}
        />
      </View>
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.upButton]}
            onPress={() => changeDirection(DIRECTIONS.UP)}>
            <Feather name="arrow-up" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.leftButton]}
            onPress={() => changeDirection(DIRECTIONS.LEFT)}>
            <Feather name="arrow-left" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.rightButton]}
            onPress={() => changeDirection(DIRECTIONS.RIGHT)}>
            <Feather name="arrow-right" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.downButton]}
            onPress={() => changeDirection(DIRECTIONS.DOWN)}>
            <Feather name="arrow-down" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  score: {
    color: '#fff',
    fontSize: 24,
    margin: 10,
  },
  grid: {
    width: '98%',
    height: width,
    position: 'relative',
    borderRadius: 10,
    backgroundColor: THEME.WHITE,
    marginVertical: hp(4),
  },
  cell: {
    position: 'absolute',
    width: CELL_SIZE - 2,
    height: CELL_SIZE - 2,
    margin: 1,
    borderRadius: CELL_SIZE / 2,
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  controlButton: {
    padding: wp(3),
    borderRadius: 200 / 2,
    marginHorizontal: wp(6),
  },
  upButton: {
    backgroundColor: '#007aff',
  },
  downButton: {
    backgroundColor: '#ff3b30',
  },
  leftButton: {
    backgroundColor: '#4cd964',
  },
  rightButton: {
    backgroundColor: '#ff9500',
  },
});

export default App;
