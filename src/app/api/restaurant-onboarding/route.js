import { NextResponse } from "next/server";

// Validation utilities
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));

const validatePhone = (phone) =>
  String(phone || "").replace(/[^0-9]/g, "").length >= 7;

const validatePostalCode = (postalCode) =>
  /^[0-9]{5,6}$/.test(String(postalCode || "").replace(/[^0-9]/g, ""));

const validateUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateOperatingHours = (hours) => {
  if (!hours || !hours.from || !hours.to) return false;

  // Check if times are in valid HH:MM format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(hours.from) && timeRegex.test(hours.to);
};

// Main validation function
const validateRestaurantData = (data) => {
  const errors = [];

  // Required string fields
  const requiredFields = [
    { key: "restaurantName", message: "Restaurant name is required" },
    { key: "ownerName", message: "Owner name is required" },
    { key: "address", message: "Address is required" },
    { key: "city", message: "City is required" },
    { key: "postalCode", message: "Postal code is required" },
    { key: "cuisineType", message: "Cuisine type is required" },
  ];

  requiredFields.forEach(({ key, message }) => {
    if (!data[key] || !String(data[key]).trim()) {
      errors.push(message);
    }
  });

  // Email validation
  if (!validateEmail(data.email)) {
    errors.push("Please provide a valid email address");
  }

  // Phone validation
  if (!validatePhone(data.phone)) {
    errors.push("Please provide a valid phone number");
  }

  // Postal code validation
  if (data.postalCode && !validatePostalCode(data.postalCode)) {
    errors.push("Please provide a valid postal code");
  }

  // Website URL validation
  if (data.website && !validateUrl(data.website)) {
    errors.push("Please provide a valid website URL");
  }

  // Seating capacity validation
  const capacity = parseInt(data.seatingCapacity);
  if (!capacity || capacity < 1 || capacity > 1000) {
    errors.push("Seating capacity must be between 1 and 1000");
  }

  // Operating hours validation
  if (!validateOperatingHours(data.operatingHours)) {
    errors.push("Please provide valid operating hours");
  }

  return errors;
};

// Sanitize and format data
const sanitizeRestaurantData = (data) => {
  return {
    restaurantName: String(data.restaurantName || "").trim(),
    ownerName: String(data.ownerName || "").trim(),
    email: String(data.email || "")
      .trim()
      .toLowerCase(),
    phone: String(data.phone || "").trim(),
    address: String(data.address || "").trim(),
    city: String(data.city || "").trim(),
    state: String(data.state || "").trim(),
    postalCode: String(data.postalCode || "").replace(/[^0-9]/g, ""),
    country: String(data.country || "India").trim(),
    cuisineType: String(data.cuisineType || "").trim(),
    seatingCapacity: parseInt(data.seatingCapacity) || 0,
    operatingHours: {
      from: String(data.operatingHours?.from || "").trim(),
      to: String(data.operatingHours?.to || "").trim(),
    },
    website: String(data.website || "").trim(),
    description: String(data.description || "").trim(),
    specialDishes: String(data.specialDishes || "").trim(),
    deliveryAvailable: Boolean(data.deliveryAvailable),
    takeoutAvailable: Boolean(data.takeoutAvailable),
    submittedAt: data.submittedAt || new Date().toISOString(),
    status: "pending", // Default status for new applications
  };
};

// Mock database storage (replace with actual database integration)
const saveRestaurantApplication = async (restaurantData) => {
  // In a real application, you would save this to a database
  // For now, we'll just log it and simulate success
  console.log("Restaurant Application Submitted:", {
    ...restaurantData,
    id: `rest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  });

  // Simulate async database operation
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    success: true,
    applicationId: `REST-${Date.now()}`,
    message: "Application submitted successfully",
  };
};

// Send notification email (mock implementation)
const sendApplicationNotification = async (restaurantData) => {
  // In a real application, you would integrate with an email service
  // like SendGrid, AWS SES, or similar
  console.log(
    "Sending application notification email for:",
    restaurantData.restaurantName
  );

  // Mock email content
  const emailContent = {
    to: restaurantData.email,
    subject: "Restaurant Application Received - Zestro",
    html: `
      <h2>Thank you for your interest in Zestro!</h2>
      <p>Dear ${restaurantData.ownerName},</p>
      <p>We have received your restaurant onboarding application for <strong>${restaurantData.restaurantName}</strong>.</p>
      <p>Our team will review your application and contact you within 2-3 business days.</p>
      <p>Application Details:</p>
      <ul>
        <li>Restaurant: ${restaurantData.restaurantName}</li>
        <li>Cuisine: ${restaurantData.cuisineType}</li>
        <li>Location: ${restaurantData.city}, ${restaurantData.state}</li>
        <li>Seating Capacity: ${restaurantData.seatingCapacity}</li>
      </ul>
      <p>Best regards,<br>The Zestro Team</p>
    `,
  };

  // Simulate email sending
  return { success: true, emailContent };
};

export async function POST(request) {
  try {
    // Parse request body
    const data = await request.json();

    // Validate the incoming data
    const validationErrors = validateRestaurantData(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize and format the data
    const sanitizedData = sanitizeRestaurantData(data);

    // Check for duplicate applications (by email)
    // In a real app, you'd check your database for existing applications
    // For now, we'll skip this check

    // Save the application to database
    const saveResult = await saveRestaurantApplication(sanitizedData);

    if (!saveResult.success) {
      throw new Error("Failed to save application");
    }

    // Send confirmation email to the restaurant owner
    try {
      await sendApplicationNotification(sanitizedData);
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Don't fail the entire request if email fails
    }

    // Send success response
    return NextResponse.json({
      success: true,
      message: "Restaurant application submitted successfully",
      applicationId: saveResult.applicationId,
      data: {
        restaurantName: sanitizedData.restaurantName,
        submittedAt: sanitizedData.submittedAt,
        status: sanitizedData.status,
      },
    });
  } catch (error) {
    console.error("Restaurant onboarding API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}
