use std::process::Command;
use std::io::Write;

fn main() {
    println!("Hello ASL!");

    let output = Command::new("date")
        .arg("+%Y-%m-%d")
        .output()
        .unwrap();
    
    std::io::stdout().write_all(&output.stdout).unwrap();
}