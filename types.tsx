export type User = {
    id: String,
    email: String,
    password: String,
    tasks: Task[],
    name: String
}

export type Task = {
    id: String,
    title: String,
    description: String,
    dueDate: Date,
    status: boolean
}

export type UserState = {
    users: User[],
    activeUser: User | null
}

export type ScreenNames = ["Login", "Register", "LandingPage"] 
