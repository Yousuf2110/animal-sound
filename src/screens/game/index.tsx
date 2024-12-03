import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');
const GRID_SIZE = Math.floor(Math.min(width, height) / 15);
const SPEED = 200;

type Coordinate = [number, number];

const Game: React.FC = () => {
  const [snake, setSnake] = useState<Coordinate[]>([[0, 0]]);
  const [food, setFood] = useState<Coordinate>([5, 5]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    'RIGHT',
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => moveSnake(), SPEED);
    return () => clearInterval(interval);
  }, [snake, direction, isGameOver]);

  const randomFoodPosition = (): Coordinate => {
    const maxGridX = Math.floor(width / GRID_SIZE) - 1;
    const maxGridY = Math.floor(height / GRID_SIZE) - 1;
    return [
      Math.floor(Math.random() * (maxGridX + 1)),
      Math.floor(Math.random() * (maxGridY + 1)),
    ];
  };

  const moveSnake = (): void => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    let newHead: Coordinate;

    switch (direction) {
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
    }

    if (checkCollision(newHead)) {
      gameOver();
      return;
    }

    newSnake.push(newHead);

    if (checkFoodCollision(newHead)) {
      setScore(score + 1);
      setFood(randomFoodPosition());
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  const checkCollision = (head: Coordinate): boolean => {
    const maxGridX = Math.floor(width / GRID_SIZE);
    const maxGridY = Math.floor(height / GRID_SIZE);
    if (
      head[0] < 0 ||
      head[0] >= maxGridX ||
      head[1] < 0 ||
      head[1] >= maxGridY
    ) {
      return true;
    }
    return snake.some(
      segment => segment[0] === head[0] && segment[1] === head[1],
    );
  };

  const checkFoodCollision = (head: Coordinate): boolean => {
    return head[0] === food[0] && head[1] === food[1];
  };

  const gameOver = (): void => {
    setIsGameOver(true);
    Alert.alert('Game Over', `Your Score: ${score}`, [
      {text: 'Restart', onPress: restartGame},
    ]);
  };

  const restartGame = (): void => {
    setSnake([[0, 0]]);
    setFood(randomFoodPosition());
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
  };

  const changeDirection = (
    newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
  ): void => {
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <LinearGradient
      colors={['#2980b9', '#6dd5fa', '#ffffff']}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.grid}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.snake,
              {
                width: GRID_SIZE,
                height: GRID_SIZE,
                left: segment[0] * GRID_SIZE,
                top: segment[1] * GRID_SIZE,
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.food,
            {
              width: GRID_SIZE,
              height: GRID_SIZE,
              left: food[0] * GRID_SIZE,
              top: food[1] * GRID_SIZE,
              borderRadius: GRID_SIZE / 2,
            },
          ]}
        />
      </View>
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.upButton]}
            onPress={() => changeDirection('UP')}>
            <Feather name="arrow-up" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.leftButton]}
            onPress={() => changeDirection('LEFT')}>
            <Feather name="arrow-left" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.rightButton]}
            onPress={() => changeDirection('RIGHT')}>
            <Feather name="arrow-right" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.downButton]}
            onPress={() => changeDirection('DOWN')}>
            <Feather name="arrow-down" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Game;
