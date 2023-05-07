

export interface Course {
    id: number;
  course: string;
  category: string;
  path: string;
  image: string;

}

const CourseList:Course[] = [
  {
    "id": 0,
    "course": "aws",
    "category": "generals",
    "path": "python.md",
    "image":  "./images/aws_2.jpg"
  },
  {
    "id": 1,
    "course": "bentoML-toc",
    "category": "machine-learning",
    "path": "python.md",
    "image":  "./images/bentoML.png"
  },
  {
    "id": 2,
    "course": "ci-cd",
    "category": "devOPS",
    "path": "python.md",
    "image":  "./images/ci-cd.png"
  },
  {
    "id": 3,
    "course": "docker",
    "category": "devOPS",
    "path": "python.md",
    "image":  "./images/docker.png"
  },
  {
    "id": 4,
    "course": "elasticsearch",
    "category": "databases",
    "path": "python.md",
    "image":  "images/elasticsearch_2.png"
  },
  {
    "id": 5,
    "course": "kubernetes",
    "category": "generals",
    "path": "python.md",
    "image":  "./images/kubernetes_2.png"
  },
  {
    "id": 6,
    "course": "mlflow",
    "category": "machine-learning",
    "path": "python.md",
    "image":  "./images/mlflow_4.jfif"
  },
  {
    "id": 7,
    "course": "mlops",
    "category": "machine-learning",
    "path": "python.md",
    "image":  "./images/mlops.png"
  },
  {
    "id": 8,
    "course": "onnx",
    "category": "machine-learning",
    "path": "python.md",
    "image":  "./images/onnx.png"
  },
  {
    "id": 9,
    "course": "postgresSQL",
    "category": "databases",
    "path": "python.md",
    "image":  "images/postgreSQL.png"
  },
  {
    "id": 10,
    "course": "puppetters",
    "category": "generals",
    "path": "python.md",
    "image":  "./images/puppet.png"
  },
  {
    "id": 11,
    "course": "react",
    "category": "framework",
    "path": "python.md",
    "image":  "./images/react_2.png"
  },
  {
    "id": 12,
    "course": "semantic_search",
    "category": "machine-learning",
    "path": "python.md",
    "image":  "./images/semantic-search.webp"
  },
  {
    "id": 13,
    "course": "signals",
    "category": "generals",
    "path": "python.md",
    "image":  "./images/signals.webp"
  },
];



export default CourseList;