import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" colorScheme="blue" ml={2}>Add</Button>
        </Flex>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex justify="space-between" align="center">
                <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
                <Box>
                  <Button onClick={() => toggleTaskCompletion(task.id)} size="sm" colorScheme={task.isCompleted ? 'orange' : 'green'} mr={2}>
                    <FaCheck />
                  </Button>
                  <Button onClick={() => removeTask(task.id)} size="sm" colorScheme="red">
                    <FaTrash />
                  </Button>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;