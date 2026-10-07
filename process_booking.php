<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $fullName = htmlspecialchars(trim($_POST['fullName']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $nights = intval($_POST['nights']);
    $guests = intval($_POST['guests']);
    $roomType = htmlspecialchars($_POST['roomType']);
    
    $breakfast = isset($_POST['breakfast']) ? true : false;
    $transfer = isset($_POST['transfer']) ? true : false;
    $conference = isset($_POST['conference']) ? true : false;

    if (empty($fullName) || empty($email) || !preg_match("/^\d{10}$/", $phone) || $nights < 1 || $nights > 14 || $guests < 1 || empty($roomType)) {
        die("Server validation failed. Please provide correct information.");
    }

    $roomRates = [
        'Single' => 3500,
        'Double' => 5000,
        'Family' => 7500
    ];

    $totalAmount = 0;

    if (array_key_exists($roomType, $roomRates)) {
        $totalAmount += $roomRates[$roomType] * $nights;
    } else {
        die("Invalid room type selected.");
    }

    if ($breakfast) {
        $totalAmount += 700 * $guests * $nights;
    }

    if ($transfer) {
        $totalAmount += 2000;
    }

    if ($conference) {
        $totalAmount += 5000;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmed - Sunrise Hotel</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>BOOKING CONFIRMED</h2>
        
        <div style="text-align: left; margin-bottom: 20px; font-size: 1.1em; color: #34495e; line-height: 1.8;">
            <p style="text-align: left; margin: 5px 0;"><strong>Customer:</strong> <?php echo $fullName; ?></p>
            <p style="text-align: left; margin: 5px 0;"><strong>Room:</strong> <?php echo $roomType; ?> Room</p>
            <p style="text-align: left; margin: 5px 0;"><strong>Guests:</strong> <?php echo $guests; ?></p>
            <p style="text-align: left; margin: 5px 0;"><strong>Number of Nights:</strong> <?php echo $nights; ?></p>
            <p style="text-align: left; margin: 5px 0;"><strong>Breakfast:</strong> <?php echo $breakfast ? 'Yes' : 'No'; ?></p>
            <p style="text-align: left; margin: 5px 0;"><strong>Airport Transfer:</strong> <?php echo $transfer ? 'Yes' : 'No'; ?></p>
            <p style="text-align: left; margin: 5px 0;"><strong>Conference Room:</strong> <?php echo $conference ? 'Yes' : 'No'; ?></p>
        </div>
        
        <div class="summary-box">
            <h3>TOTAL AMOUNT: KSh <?php echo number_format($totalAmount); ?></h3>
        </div>
        
        <p style="font-weight: bold; color: #2c3e50;">Thank you for choosing Sunrise Hotel.</p>
        
        <a href="index.html" class="btn" style="margin-top: 20px;">Return to Home</a>
    </div>
</body>
</html>
<?php
} else {
    echo "Invalid request method.";
}
?>